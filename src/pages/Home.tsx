import React from "react";
import Typewriter from "../components/Typewriter";
import { useLanguage } from "../hooks/useLanguage";

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="page-home" key={language}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <img
          src="/favicon.png"
          alt="Avatar"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "2px solid var(--accent)",
          }}
        />
        <div>
          <p>
            <span className="prompt">$</span>
            <Typewriter text="whoami" speed={50} />
          </p>
          <h1 style={{ margin: 0 }}>
            <Typewriter text={t.name} speed={100} delay={500} />
          </h1>
          <p style={{ color: "var(--accent)", fontSize: "1.2rem" }}>
            <Typewriter text={t.role} delay={1500} speed={50} />
          </p>
        </div>
      </div>

      <section>
        <p>
          <span className="prompt">$</span>
          <Typewriter text="cat bio.txt" speed={50} delay={2500} />
        </p>
        <p
          style={{ paddingLeft: "1rem", borderLeft: "2px solid var(--border)" }}
        >
          <Typewriter text={t.bio} delay={3200} speed={30} />
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <p>
          <span className="prompt">$</span>
          <Typewriter text="firstfetch" speed={50} delay={4500} />
        </p>
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>OS</strong>:{" "}
            <Typewriter text="Arch Linux" delay={5200} speed={20} />
          </p>
          <p>
            <strong>Host</strong>:{" "}
            <Typewriter
              text={`${t.name}-IdeaPad Slim 3 14ARP10`}
              delay={5500}
              speed={20}
            />
          </p>
          <p>
            <strong>Kernel</strong>:{" "}
            <Typewriter text="Linux 6.18.33-1-lts" delay={5800} speed={20} />
          </p>
          <p>
            <strong>Shell</strong>:{" "}
            <Typewriter text=" ghostty 1.3.1-arch2" delay={6100} speed={20} />
          </p>
        </div>
      </section>

      {t.education && (
        <section style={{ marginTop: "2rem" }}>
          <p>
            <span className="prompt">$</span>
            <Typewriter text="cat education.md" speed={50} delay={6500} />
          </p>
          <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
            {t.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--accent)", fontWeight: "bold" }}>
                  <Typewriter
                    text={`> ${edu.degree}`}
                    delay={7000 + index * 500}
                    speed={30}
                  />
                </p>
                <p>
                  <Typewriter
                    text={`${edu.institution} | ${edu.period}`}
                    delay={7500 + index * 500}
                    speed={20}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {t.awards && (
        <section style={{ marginTop: "2rem" }}>
          <p>
            <span className="prompt">$</span>
            <Typewriter text="cat awards.md" speed={50} delay={8500} />
          </p>
          <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
            {t.awards.map((award, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--accent)", fontWeight: "bold" }}>
                  <Typewriter
                    text={`* ${award.title}`}
                    delay={9000 + index * 500}
                    speed={30}
                  />
                </p>
                <p>
                  <Typewriter
                    text={`${award.date}: ${award.desc}`}
                    delay={9500 + index * 500}
                    speed={20}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {t.publications && (
        <section style={{ marginTop: "2rem" }}>
          <p>
            <span className="prompt">$</span>
            <Typewriter text="cat publications.md" speed={50} delay={10500} />
          </p>
          <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
            {t.publications.map((pub, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--accent)", fontWeight: "bold" }}>
                  <Typewriter
                    text={`- ${pub.title}`}
                    delay={11000 + index * 500}
                    speed={30}
                  />
                </p>
                <p>
                  <Typewriter
                    text={`${pub.publisher} (${pub.year})`}
                    delay={11500 + index * 500}
                    speed={20}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
