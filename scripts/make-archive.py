#!/usr/bin/env python3
"""ينشئ CHECKSUMS.txt وثلاثة أرشيفات جاهزة للتسليم."""
from __future__ import annotations
import hashlib
import os
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
HOME = ROOT.parent
EXCLUDE_DIRS = {"node_modules", ".next", ".git", "__pycache__", ".turbo", ".cache", ".idea", ".vscode"}
EXCLUDE_FILES = {"tsconfig.tsbuildinfo", ".env", ".DS_Store", "Thumbs.db", "CHECKSUMS.txt"}
EXCLUDE_SUFFIX = (".zip", ".log", ".tsbuildinfo")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def collect(base: Path, include_out: bool) -> list[Path]:
    out: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(base):
        d = Path(dirpath)
        dirnames[:] = [x for x in dirnames if x not in EXCLUDE_DIRS and not (x == "out" and not include_out)]
        for name in sorted(filenames):
            if name in EXCLUDE_FILES or name.endswith(EXCLUDE_SUFFIX):
                continue
            out.append(d / name)
    return sorted(out, key=lambda p: p.relative_to(base).as_posix())


def write_zip(path: Path, files: list[tuple[Path, str]]) -> None:
    with ZipFile(path, "w", ZIP_DEFLATED, compresslevel=9) as z:
        for src, arc in files:
            z.write(src, arc)
    print(f"  {path.name}: {path.stat().st_size:,} bytes, {len(files)} files")


def main() -> None:
    source_files = collect(ROOT, include_out=True)
    checksums = [f"sha256  {p.relative_to(ROOT).as_posix()}" for p in []]
    lines = ["# عُدّة / Oudda — SHA-256 checksums", "# Created by scripts/make-archive.py", ""]
    for p in source_files:
        lines.append(f"{sha256(p)}  {p.relative_to(ROOT).as_posix()}")
    (ROOT / "CHECKSUMS.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    source_files.append(ROOT / "CHECKSUMS.txt")
    source_files.sort(key=lambda p: p.relative_to(ROOT).as_posix())
    print("Artifacts:")

    # 1) المشروع الكامل: المصدر + out/ + الوثائق + الفحوصات
    complete = [(p, f"oudda/{p.relative_to(ROOT).as_posix()}") for p in source_files]
    write_zip(HOME / "oudda-complete.zip", complete)

    # 2) الموقع الثابت فقط — للرفع المباشر إلى Pages
    out_dir = ROOT / "out"
    static = [(p, p.relative_to(out_dir).as_posix()) for p in collect(out_dir, include_out=True)]
    write_zip(HOME / "oudda-static-site.zip", static)

    # 3) المصدر فقط — لمستودع Git (Cloudflare Pages يبنيه)
    src_only = [p for p in source_files if not p.relative_to(ROOT).as_posix().startswith("out/")]
    write_zip(HOME / "oudda-source.zip", [(p, f"oudda/{p.relative_to(ROOT).as_posix()}") for p in src_only])

    print("\nZIP SHA-256:")
    for name in ["oudda-complete.zip", "oudda-static-site.zip", "oudda-source.zip"]:
        print(f"{sha256(HOME / name)}  {name}")


if __name__ == "__main__":
    main()
