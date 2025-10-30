import ContactForm from "app/components/contact-form/ContactForm";

export default function ContactPage() {
    return (
        <main className="flex flex-col justify-center items-start max-w-5xl w-full mx-auto p-6 space-y-6 min-h-[calc(100vh-10rem)]">
            <header>
                <h1 className="text-2xl font-semibold">Contacto</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Dejame tu mensaje y te respondo por mail.
                </p>
            </header>
            <ContactForm />
        </main>
    );
}

