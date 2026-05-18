import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const REVIEWS = [
  {
    quote: 'I love that Focus does not try to sell me a subscription. It is just beautiful daily quotes and a private journal. Truly a peaceful place to spend my mornings.',
    author: 'Zain Khan',
    role: 'Creative Designer',
  },
  {
    quote: 'I really like this Focus app. It has a nice collection of quotes for different moods, so I don’t have to go searching every time I need motivation or a little push. The quotes feel random but still meaningful, and somehow they always fit what I’m going through. The mood tracker is also really helpful. It lets me keep track of how I’m feeling over time, and it kind of doubles as a journal too, which I really like because I often forget my thoughts or even poetry ideas before writing them down. I also like the notifications—it sends quotes at the right time, especially on bad days, and they actually help me feel a bit better or calmer. Overall, it just feels like a simple but really thoughtful app that quietly supports you in the background.',
    author: 'Smiti Chavan',
    role: 'Computer Engineer',
  },
  {
    quote: 'Focus loads instantly and operates entirely offline. No tracking trackers, no cloud accounts, no notification spam. Just beautiful calligraphy wisdom in a clean dark UI.',
    author: 'Ankit Patel',
    role: 'Software Engineer',
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-[#1B1B1B] py-24 md:py-32 border-b border-[#FFE7D0]/5">

      {/* Visual styling background blur */}
      <div className="absolute top-10 right-10 w-[30vw] h-[30vw] rounded-full bg-[#FFE7D0]/2 blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[12px] font-sans tracking-[0.2em] font-semibold text-[#FC6E20] uppercase">
            User Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFE7D0] mt-3 leading-tight">
            Loved by seekers of quiet growth
          </h2>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between items-start border border-[#FFE7D0]/5 relative group"
            >
              {/* Elegant Accent quote icon */}
              <div className="absolute top-6 right-8 text-[#FC6E20]/15 group-hover:text-[#FC6E20]/30 transition-colors duration-300">
                <Quote className="w-10 h-10 transform rotate-180" />
              </div>

              {/* Quote Content */}
              <div className="flex-grow">
                <p className="text-base md:text-lg font-serif text-[#FFE7D0] leading-relaxed italic pr-4">
                  "{rev.quote}"
                </p>
              </div>

              {/* Quote Author */}
              <div className="mt-8 border-t border-[#FFE7D0]/10 pt-4 w-full flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-sans font-bold text-[#FC6E20]">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-[#FFE7D0]/50 font-sans mt-0.5">
                    {rev.role}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
