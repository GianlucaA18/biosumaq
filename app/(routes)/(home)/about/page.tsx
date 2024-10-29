import Navbar from "@/components/clientes/navbar";
import Info from "./components/info";
import QuienesSomos from "./components/quienesSomos";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";

const About = () => {
    return (
        <div>
            <Navbar />
            <Redes/>
            <div className="py-4">
                <QuienesSomos />
                <Info />
            </div>
            <Footer/>
        </div>
    );
}

export default About;