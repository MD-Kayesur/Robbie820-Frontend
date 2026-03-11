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
    <section className="pb-24 pt-25 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-[#12A8F5] md:text-4xl">
            Stop Losing Money To Manual Processes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#475569] md:text-lg">
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
              className="w-150 mx-3 aspect-16/10 rounded-lg overflow-hidden border-4 border-[#A9ABAC]"
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
