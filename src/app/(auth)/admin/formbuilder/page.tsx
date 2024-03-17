"use client";

import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { makeCategory } from "@/apis/apicalls";
import toast from "react-hot-toast";

interface PageProps {}
interface Field {
  id: string;
  label: string;
  [key: string]: string;
}

const Page: FC<PageProps> = ({}) => {
  const [fields, setFields] = useState<Field[]>([{ id: "", label: "" }]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        label: "",
      },
    ]);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const { mutate: CreateCategory, isPending } = useMutation({
    mutationFn: makeCategory,
    onSettled: (data: any) => {
      if (data.response.status === 422) {
        const errorArr: any[] = Object.values(data.response.data.errors);
        toast.error(errorArr[0]);
      }
    },
    onSuccess: () => {
      toast.success("Category Made Successfully");
      setCategoryName("");
      setFields([{ id: "", label: "" }]);
    },
  });

  const handleSubmit = () => {
    const actualData = {
      category_name: categoryName,
      fields: fields.map((field) => {
        return {
          type: "text",
          label: field.label,
          placeholder: `Enter ${field.label}`,
        };
      }),
    };

    if (categoryName.trim() === "") {
      toast.error("Please enter a category name");
      return;
    }

    // Check if any field label is empty
    if (fields.some((field) => field.label.trim() === "")) {
      toast.error("Please enter a name for each field");
      return;
    }

    CreateCategory(actualData);
  };

  const handleDeleteField = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
  };

  return (
    <Container>
      <div className="mx-auto my-20 flex w-[500px] flex-col justify-center gap-5">
        <h1 className="textg-gray-700 font-bold">Add Category</h1>

        <div>
          <Label>Category Name:</Label>
          <Input
            className="border-content"
            type="text"
            placeholder="Enter Category Name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-10">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-3 rounded-lg border border-content px-5 pb-7 pt-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-600 underline underline-offset-2">
                  Field Number: {index + 1}
                </h3>

                {index > 0 && (
                  <Button
                    onClick={() => handleDeleteField(field.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash className="h-4 w-4" strokeWidth={2} />
                  </Button>
                )}
              </div>

              <div>
                <Label>Name:</Label>
                <Input
                  className="border-content"
                  type="text"
                  value={field.label}
                  placeholder="Enter Name..."
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex w-full items-center justify-between">
          <Button
            variant="outline"
            className="border-content"
            onClick={handleAddField}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button onClick={handleSubmit}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Adding Category..</p>
              </div>
            ) : (
              "Add Category"
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Page;

{
  /* <div>
  <Label>Placeholder:</Label>
  <Input
    className="border-content"
    type="text"
    value={field.placeholder}
    placeholder="Enter Placeholder..."
    onChange={(e) => handleChange(index, "placeholder", e.target.value)}
  />
</div>; */
}

{
  /* <div>
  <Label>Type:</Label>
  <Select
    value={field.type}
    onValueChange={(e) => handleChange(index, "type", e)}
  >
    <SelectTrigger className="border-content">
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Types</SelectLabel>
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="number">Number</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>; */
}

{
  /* <div>
  <Label>Category Name:</Label>
  <Input
    className="border-content"
    type="text"
    value={field.category_name}
    placeholder="Enter Category Name..."
    onChange={(e) => handleChange(index, "category_name", e.target.value)}
  />
</div>; */
}

// "use client";

// import Container from "@/components/Container";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// const Page = () => {
//   const [widgets, setWidgets] = useState<String[]>([]);

//   function handleOnDrag(e: React.DragEvent, widgetType: string) {
//     e.dataTransfer.setData("widgetType", widgetType);
//   }

//   function handleOnDrop(e: React.DragEvent) {
//     const widgetType = e.dataTransfer.getData("widgetType");
//     console.log("widgetType", widgetType);
//     setWidgets([...widgets, widgetType]);
//   }

//   function handleDragOver(e: React.DragEvent) {
//     e.preventDefault();
//   }
//   return (
// <Container>
//   <div className="relative grid w-full grid-cols-3">
//     <div className="col-span-2">
//       <div className="flex w-full justify-center">
//         <h3>Form</h3>
//         <div className="flex flex-col gap-4">
//           <div
//             className="widget"
//             draggable
//             onDragStart={(e) => handleOnDrag(e, "Widget A")}
//           >
//             Widget A
//           </div>
//           <div
//             className="widget"
//             draggable
//             onDragStart={(e) => handleOnDrag(e, "Widget B")}
//           >
//             Widget B
//           </div>
//           <div
//             className="widget"
//             draggable
//             onDragStart={(e) => handleOnDrag(e, "Widget C")}
//           >
//             Widget C
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="col-span-1 w-full bg-zinc-100">
//       <div className="flex flex-col px-3">
//         <h2>Form components</h2>
//         <div className="flex flex-col gap-5">
//           <h3>Input Fields</h3>
//           <div
//             className="h-[200px] w-[400px] border border-black"
//             onDrop={handleOnDrop}
//             onDragOver={handleDragOver}
//           >
//             {widgets.map((widget, index) => (
//               <div key={index}>{widget}</div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </Container>
//   );
// };

// export default Page;

// // const [formFields, setFormFields] = useState();
// //   const [previewFormFields, setPreviewFields] = useState();

// // For Text Input Field
// //   const [textInputs, setTextInputs] = useState();
// //   const [textInputFields, setTextInputFields] = useState();
