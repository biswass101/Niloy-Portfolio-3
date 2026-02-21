import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-2">
            <span className="text-primary">06.</span> Get In Touch
          </h2>
          <div className="w-20 h-0.5 bg-primary/50 mx-auto mb-8" />

          <p className="text-muted-foreground mb-10 leading-relaxed">
            I'm currently open to new opportunities and collaborations. Whether
            you have a question, a project idea, or just want to say hi — feel
            free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="mailto:biswassnaeemcse@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg neon-border bg-primary/10 text-primary font-mono text-sm hover:bg-primary/20 transition-all duration-300"
            >
              <Mail size={16} />
              Say Hello
            </a>
            <a
              href="tel:+8801708045058"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground font-mono text-sm hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <Phone size={16} />
              +880 1708045058
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/biswass101" },
              { icon: Linkedin, href: "https://linkedin.com/in/niloy097" },
              { icon: ExternalLink, href: "https://niloybiswass.xyz" },
            ].map(({ icon: Icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-xs text-muted-foreground font-mono"
        >
          Designed & Built by Naeem Biswass Niloy
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
