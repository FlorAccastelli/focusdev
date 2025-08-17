import ContactForm from "app/components/contact-form/ContactForm";

export default function ContactPage() {
    return (
        <main className="max-w-4xl mx-auto p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-semibold">Contacto</h1>
                <p className="text-slate-600">Dejame tu mensaje y te respondo por mail.</p>
            </header>
            <ContactForm />
        </main>
    );
}
