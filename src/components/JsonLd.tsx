/** حقن JSON-LD بطريقة آمنة: البيانات من ملفاتنا فقط، وليست مدخلات مستخدم. */
export default function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
