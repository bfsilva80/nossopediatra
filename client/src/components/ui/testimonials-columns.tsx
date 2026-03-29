import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-2xl border-2 border-blue/20 shadow-lg shadow-blue/5 max-w-xs w-full bg-white hover:border-teal/40 transition-colors"
                  key={i}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className="text-golden text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 leading-relaxed italic text-sm">
                    "{text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-blue/10">
                    {image && (
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex flex-col">
                      <div className="font-display font-bold text-foreground text-sm">
                        {name}
                      </div>
                      <div className="leading-4 opacity-60 tracking-tight text-xs">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
