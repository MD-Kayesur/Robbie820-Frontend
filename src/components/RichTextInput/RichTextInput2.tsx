import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

const RichTextInput2: React.FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/2">
        <h2 className="text-lg font-bold mb-2">✍️ Write Here</h2>
        <RichTextEditor value={value} onChange={setValue} />
      </div>

      <div className="w-1/2">
        <h2 className="text-lg font-bold mb-2">👀 Preview</h2>
        <div
          className="p-4 bg-gray-100 rounded-lg shadow min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

export default RichTextInput2;
