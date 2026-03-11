import Marquee from "react-fast-marquee";
import superAdminImg from "@/assets/landing-page/super_admin.jpg";
import referrerImg from "@/assets/landing-page/referrer.jpg";
import brokerImg from "@/assets/landing-page/broker.jpg";

const DashboardMarquee = () => {
  const screens = [
    superAdminImg,
    referrerImg,
    brokerImg,
    superAdminImg,
    referrerImg,
    brokerImg,
  ];

  return (
    <section className="sm:py-30 py-6 bg-white overflow-hidden border-t border-[#DFDEDE] sm:border-t-0 mx-4.5 sm:mx-0">
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-16 text-center">
        <div>
          <h2 className="text-lg leading-5 font-medium sm:leading-none mb-4 sm:mb-8 text-[#12A8F5] md:text-[34px]">
            Stop Losing Money To Manual Processes
          </h2>
          <p className="mx-auto max-w-2xl text-black text-sm sm:text-lg sm:leading-none">
            Manual Tracking Leads To Missed Commissions, Delays, And Costly
            Disputes. Automate Everything In One Transparent System.
          </p>
        </div>
      </div>

      <div className="relative">
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="flex gap-6"
        >
          {screens.map((img, idx) => (
            <div
              key={idx}
              className="w-71.75 sm:w-150 mx-3 aspect-16/10 rounded-sm sm:rounded-lg overflow-hidden border sm:border-4 border-[#A9ABAC]"
            >
              <img
                src={img}
                alt={`Dashboard Screen ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default DashboardMarquee;
