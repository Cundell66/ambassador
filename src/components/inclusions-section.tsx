import { ConciergeBell, Dumbbell, Theater, ToyBrick, UtensilsCrossed, Sparkles } from "lucide-react";

const includedItems = [
    {
      icon: ConciergeBell,
      title: "Great service comes as standard",
      description: "Our dedicated crew is on hand to ensure you have an unforgettable journey."
    },
    {
      icon: UtensilsCrossed,
      title: "Full board dining",
      description: "Enjoy a wide variety of culinary delights in our main restaurants and buffet."
    },
    {
      icon: Dumbbell,
      title: "Gym, pools & relaxation",
      description: "Stay active or unwind with our state-of-the-art fitness and leisure facilities."
    },
    {
      icon: Theater,
      title: "West End-style theatre shows",
      description: "Experience spectacular live entertainment every evening of your cruise."
    },
    {
      icon: ToyBrick,
      title: "Children's Clubs & activities",
      description: "Fun and games for all ages, supervised by our professional youth team."
    }
  ];
  

export function InclusionsSection() {
  return (
    <section id="inclusions" className="w-full py-12 mb-8">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary/90 flex items-center justify-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    What's included in your cruise
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Our cruises are designed to take the stress out of holiday planning, so you can feel nothing but excitement.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {includedItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                            <item.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
