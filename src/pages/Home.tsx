import ServicesSection from "@/components/test/ServicesSection";
import CommonWrapper from "../common/CommonWrapper";
import ServicesSection2 from "@/components/test/ServicesSection2";
import ScrollAnimationSection from "@/components/ScrollTextAnimation/ScrollAnimationSection";
 
 
const Home = () => {
 

  return (
    <CommonWrapper>
      <div className="h-screen bg-website-color-lightGreen">
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-2xl font-bold mb-4"> this is only for practice  

            
          </h1>
          
          {/* <ServicesSection/> */}
          {/* <ServicesSection2/> */}
          <ScrollAnimationSection></ScrollAnimationSection>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Home;

