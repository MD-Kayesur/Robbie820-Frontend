import Marquee from "react-fast-marquee";
import superAdminImg from "@/assets/super_admin.png";
import referrerImg from "@/assets/referrer.png";
import brokerImg from "@/assets/broker.png";

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
    <section className="pb-24 pt-25 bg-white overflow-hidden clash">
      <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-sky-500 mb-6  ">
            Stop Losing Money To Manual Processes
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-normal   tracking-wide">
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
          className="flex gap-8"
        >
          {screens.map((img, idx) => (
            <div
              key={idx}
              className="w-[600px] mx-4 aspect-16/10 rounded-4xl overflow-hidden border border-slate-100 bg-white"
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

