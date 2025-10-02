import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextInput: React.FC = () => {
    // state type explicitly string
    const [ value, setValue ] = useState<string>("");

    return (
        <div className="flex gap-6 p-6">
            {/* Editor */}
            <div className="w-1/2">
                <h2 className="text-lg font-bold mb-2">✍️ Write Here</h2>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content: string) => setValue(content)}
                    className="bg-white rounded-lg shadow"
                />
            </div>

            {/* Preview */}
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

export default RichTextInput;
