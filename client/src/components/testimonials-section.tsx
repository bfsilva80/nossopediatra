import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { instagramTestimonials } from "@/data/instagram-testimonials";

type Testimonial = {
	id: string;
	quote: string;
	image: string;
	name: string;
	role?: string;
	company?: string;
};

const testimonials: Testimonial[] = instagramTestimonials.map(t => ({
	  id: t.id,
	  quote: t.quote,
	  image: t.image,
	  name: t.name,
	  role: t.role,
	}));

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
// Removed thirdColumn - now showing only 2 columns for premium feel

export function TestimonialsSection() {
		return (
			<section className="relative py-20 md:py-32">
				<div className="mx-auto max-w-5xl">
					<div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4 mb-16">


						<h2 className="font-bold text-3xl tracking-tighter lg:text-4xl">
							O que os pais dizem
						</h2>
						<p className="text-center text-muted-foreground text-sm">
							Histórias reais de famílias que confiam no Dr. Bruno
						</p>
					</div>

					<div
						className={cn(
							"mt-12 flex max-h-160 justify-center gap-6 overflow-hidden",
						"mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
					)}
				>
					<InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
					{firstColumn.map((testimonial) => (
						<TestimonialsCard
							key={testimonial.id}
							testimonial={testimonial}
						/>
					))}
					</InfiniteSlider>
						<InfiniteSlider
							className="hidden md:block"
							direction="vertical"
							speed={50}
							speedOnHover={25}
						>
							{secondColumn.map((testimonial) => (
								<TestimonialsCard
									key={testimonial.id}
									testimonial={testimonial}
								/>
							))}
						</InfiniteSlider>
				</div>
			</div>
		</section>
	);
}

function TestimonialsCard({
	testimonial,
	className,
	...props
}: React.ComponentProps<"figure"> & {
	testimonial: Testimonial;
}) {
	const { quote, image, name, role, company } = testimonial;
	return (
		<figure
			className={cn(
				"w-full max-w-xs rounded-3xl border bg-card p-8 shadow-foreground/10 shadow-lg dark:bg-card/20",
				className
			)}
			{...props}
		>
			<blockquote>{quote}</blockquote>
			<figcaption className="mt-5 flex items-center gap-2">
				<Avatar className="size-8 rounded-full">
					<AvatarImage alt={`${name}'s profile picture`} src={image} />
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<cite className="font-medium not-italic leading-5 tracking-tight">
						{name}
					</cite>
					<span className="text-muted-foreground text-sm leading-5 tracking-tight">
						{role} {company && `, ${company}`}
					</span>
				</div>
			</figcaption>
		</figure>
	);
}
