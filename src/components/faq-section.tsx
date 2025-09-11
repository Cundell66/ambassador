import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react";
  
export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    items: FaqItem[];
}

export function FaqSection({ items }: FaqSectionProps) {
    if (!items || items.length === 0) {
        return null;
    }

    // Split the items into two columns
    const halfwayPoint = Math.ceil(items.length / 2);
    const column1Items = items.slice(0, halfwayPoint);
    const column2Items = items.slice(halfwayPoint);

    return (
        <section id="faq" className="w-full py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary/90 flex items-center justify-center gap-3">
                        <HelpCircle className="w-8 h-8" />
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col gap-4">
                        <Accordion type="single" collapsible className="w-full">
                            {column1Items.map((item, index) => (
                                <AccordionItem key={`col1-${index}`} value={`item-1-${index}`}>
                                    <AccordionTrigger className="text-left font-semibold text-base hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Accordion type="single" collapsible className="w-full">
                            {column2Items.map((item, index) => (
                                <AccordionItem key={`col2-${index}`} value={`item-2-${index}`}>
                                    <AccordionTrigger className="text-left font-semibold text-base hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
