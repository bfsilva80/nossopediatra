import { motion } from "framer-motion";
import { Heart, MessageCircle, Play, Instagram } from "lucide-react";

/* ── Instagram CDN Assets ── */
const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_profile_90a0e952.jpg";

interface InstaPost {
  image: string;
  permalink: string;
  likes: number;
  comments: number;
  caption: string;
  isVideo?: boolean;
}

const POSTS: InstaPost[] = [
  {
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_insta_post_1_7663b86d.jpg",
    permalink: "https://www.instagram.com/p/DVchUqTkYI4/",
    likes: 157,
    comments: 19,
    caption: "Às vezes a gente escreve para explicar alguma coisa. Para respirar. Para dar alguma utilidade às dores desse mundo.",
  },
  {
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_insta_post_2_3ca3b199.jpg",
    permalink: "https://www.instagram.com/reel/DVog297keGC/",
    likes: 148,
    comments: 10,
    caption: "Às vezes eu penso que o Dia da Mulher não deveria precisar existir. Não porque ele não tenha valor...",
    isVideo: true,
  },
  {
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_insta_post_3_3545474c.jpg",
    permalink: "https://www.instagram.com/reel/DUTKMSlEWLJ/",
    likes: 125,
    comments: 6,
    caption: "Para muitas crianças, a constipação não começa no intestino. Começa quando a dor chega antes da explicação.",
    isVideo: true,
  },
  {
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_insta_post_4_2c2a3c95.jpg",
    permalink: "https://www.instagram.com/reel/DVeec4vD7GZ/",
    likes: 34,
    comments: 5,
    caption: "Quem tem filho sabe que chega uma fase da vida em que a casa inteira vira equipe de incentivo pro cocô.",
    isVideo: true,
  },
  {
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663032144186/PuMdTu4TNdQ4HP2G9zPMa2/np_insta_post_5_0dfbcae5.jpg",
    permalink: "https://www.instagram.com/reel/DVDG0PRDb1j/",
    likes: 0,
    comments: 0,
    caption: "Ainda faltaram algumas que não pude registrar na época...",
    isVideo: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 } as const,
  }),
};

export default function InstagramGallery() {
  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Wavy top divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
          <path fill="oklch(0.97 0.008 75)" fillOpacity="0.5" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="container">
        {/* Header with profile info */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <a
            href="https://instagram.com/nossopediatra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center group"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-salmon via-pastel-pink to-pastel-peach">
                <img
                  src={PROFILE_IMG}
                  alt="@nossopediatra"
                  className="w-full h-full rounded-full object-cover border-3 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-full flex items-center justify-center shadow-md">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <h2 className="mb-1 group-hover:text-salmon transition-colors">
              @nosso<span className="text-salmon">pediatra</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed font-display">
              Barriga de criança tem história. Aprendi ouvir com ciência, abraço e fé.
            </p>
            <div className="flex items-center gap-6 mt-3 text-xs font-display font-bold text-muted-foreground">
              <span><span className="text-foreground text-sm">3.074</span> seguidores</span>
              <span><span className="text-foreground text-sm">143</span> posts</span>
            </div>
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {POSTS.map((post, idx) => (
            <motion.a
              key={idx}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-pastel-peach/20 hover:border-salmon/30 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={idx + 1}
            >
              <img
                src={post.image}
                alt={post.caption.slice(0, 60)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Video indicator */}
              {post.isVideo && (
                <div className="absolute top-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white font-display font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
        >
          <a
            href="https://instagram.com/nossopediatra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 !border-[#E1306C] !text-[#E1306C] hover:!bg-[#E1306C]/5"
          >
            <Instagram className="w-4 h-4" />
            Seguir no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
