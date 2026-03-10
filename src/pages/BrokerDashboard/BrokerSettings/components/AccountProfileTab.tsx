import { Camera, Trash2 } from "lucide-react";
import { useRef } from "react";

import type { BrokerProfile } from "../types";

type AccountProfileTabProps = {
  profile: BrokerProfile;
  onChange: (value: BrokerProfile) => void;
};

const AccountProfileTab = ({ profile, onChange }: AccountProfileTabProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateField = <K extends keyof BrokerProfile>(
    key: K,
    value: BrokerProfile[K],
  ) => {
    onChange({
      ...profile,
      [key]: value,
    });
  };

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onChange({
          ...profile,
          photo: result,
        });
      }
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleRemovePhoto = () => {
    onChange({
      ...profile,
      photo: "",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_252px]">
      <div className="space-y-4">
        <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="mb-5 text-[18px] font-semibold uppercase tracking-[-0.03em] text-[#111827] sm:mb-6 sm:text-[22px]">
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

        <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="mb-5 text-[18px] font-semibold uppercase tracking-[-0.03em] text-[#111827] sm:mb-6 sm:text-[22px]">
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mx-auto flex h-22 w-22 items-center justify-center overflow-hidden rounded-full bg-[#08122E] sm:h-26 sm:w-26">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[42px] font-semibold tracking-[-0.04em] text-[#24A7F2] sm:text-[54px]">
              {profile.initials}
            </span>
          )}
        </div>

        <h3 className="mt-5 wrap-break-word text-[16px] font-semibold text-[#111827] sm:text-[18px]">
          {profile.fullName}
        </h3>
        <p className="mt-1 text-[13px] text-[#6B7280] sm:text-[14px]">
          {profile.role}
        </p>

        <button
          type="button"
          onClick={handleChoosePhoto}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-[15px] font-medium text-[#374151] transition hover:bg-slate-50"
        >
          <Camera className="h-4 w-4" />
          {profile.photo ? "Change Photo" : "Upload Photo"}
        </button>

        {profile.photo ? (
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 text-[15px] font-medium text-[#DC2626] transition hover:bg-[#fee2e2]"
          >
            <Trash2 className="h-4 w-4" />
            Remove Photo
          </button>
        ) : null}
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
      <span className="mb-2 block text-[12px] font-medium uppercase text-[#8B8F97] sm:text-[13px]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300 sm:h-12 sm:text-[16px]"
      />
    </label>
  );
}

export default AccountProfileTab;
