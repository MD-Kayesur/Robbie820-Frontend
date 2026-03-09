import type { BrokerProfile } from "../types";

type AccountProfileTabProps = {
  profile: BrokerProfile;
  onChange: (value: BrokerProfile) => void;
};

const AccountProfileTab = ({ profile, onChange }: AccountProfileTabProps) => {
  const updateField = <K extends keyof BrokerProfile>(
    key: K,
    value: BrokerProfile[K],
  ) => {
    onChange({
      ...profile,
      [key]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_252px]">
      <div className="space-y-4">
        <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="mb-6 text-[22px] font-semibold uppercase tracking-[-0.03em] text-[#111827]">
            Broker Identity
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InputField
              label="FULL NAME"
              value={profile.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <InputField
              label="Australian Credit Rep / Licence #"
              value={profile.licenceNumber}
              onChange={(value) => updateField("licenceNumber", value)}
            />
          </div>

          <div className="mt-5">
            <InputField
              label="COMPANY NAME"
              value={profile.companyName}
              onChange={(value) => updateField("companyName", value)}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <InputField
              label="WORK EMAIL"
              value={profile.workEmail}
              onChange={(value) => updateField("workEmail", value)}
            />
            <InputField
              label="MOBILE PHONE"
              value={profile.mobilePhone}
              onChange={(value) => updateField("mobilePhone", value)}
            />
          </div>
        </section>

        <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="mb-6 text-[22px] font-semibold uppercase tracking-[-0.03em] text-[#111827]">
            Address & Region
          </h2>

          <div>
            <InputField
              label="OFFICE STREET ADDRESS"
              value={profile.officeStreetAddress}
              onChange={(value) => updateField("officeStreetAddress", value)}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <InputField
              label="CITY"
              value={profile.city}
              onChange={(value) => updateField("city", value)}
            />
            <InputField
              label="STATE"
              value={profile.state}
              onChange={(value) => updateField("state", value)}
            />
            <InputField
              label="ZIP"
              value={profile.zip}
              onChange={(value) => updateField("zip", value)}
            />
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-[20px] border border-[#DADDE3] bg-white p-5 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[#08122E] text-[54px] font-semibold tracking-[-0.04em] text-[#24A7F2]">
          {profile.initials}
        </div>

        <h3 className="mt-5 text-[18px] font-semibold text-[#111827]">
          {profile.fullName}
        </h3>
        <p className="mt-1 text-[14px] text-[#6B7280]">{profile.role}</p>

        <button
          type="button"
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[15px] font-medium text-[#374151] transition hover:bg-slate-50"
        >
          Change Photo
        </button>
      </aside>
    </div>
  );
};

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium uppercase text-[#8B8F97]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[16px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300"
      />
    </label>
  );
}

export default AccountProfileTab;
