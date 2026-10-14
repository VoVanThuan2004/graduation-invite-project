import GraduationCard from "../../components/graduation/GraduationCard";
import { graduation } from "../../data/graduation";
import "../../styles/graduation.css";

export default function GraduationPage() {
  return (
    <main className="graduation-page">
      <header className="page-heading">
        <p className="page-eyebrow">{graduation.eyebrow}</p>
        <span className="page-class">{graduation.classYear}</span>
        <h1>{graduation.pageTitle}</h1>
        <p className="page-intro">{graduation.intro}</p>
      </header>
      <section className="invitation-section" aria-label="Thiệp mời tốt nghiệp">
        <GraduationCard invitation={graduation} />
      </section>
      <p className="page-note">Một lời mời nhỏ dành cho những người đặc biệt.</p>
    </main>
  );
}
