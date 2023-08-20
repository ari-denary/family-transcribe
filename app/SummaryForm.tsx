"use client"

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FormInterface {
  text: string;
  translate: boolean;
  language: string;
}

export default function SummaryForm(){
  const [form, setForm] = useState<FormInterface>({
    text: "",
    translate: false,
    language: ""
  });

  const handleChange = (evt: any) => {
    const input = evt.target;
    if (input.name === "text"){
      setForm(formData => ({
        ...formData,
        [input.name]: input.value,
      }));
    } else {
      setForm(formData => ({
        ...formData,
        [input.name]: !form.translate,
      }));
    }
  }

  const updateLanguage = (value: string) => {
    setForm(formData => ({
      ...formData,
      ["language"]: value,
    }));
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <Textarea name="text" onChange={handleChange}/>
      <Checkbox id="translate" name="translate" onChange={handleChange}/>
      <Label htmlFor="translate">Translate?</Label>
      <DropdownMenu>
          <DropdownMenuTrigger disabled={!form.translate}>
            <Button variant="outline">Choose Language</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={form.language} onValueChange={updateLanguage}>
            <DropdownMenuRadioItem value="arabic">Arabic</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="chinese-simplified">Chinese-Simplified</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="chinese-traditional">Chinese-Traditional</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dutch">Dutch</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="french">French</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="german">German</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="italian">Italian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="japanese">Japenese</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="korean">Korean</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="portuguese">Portuguese</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="russian">Russian</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="spanish">Spanish</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="turkish">Turkish</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          </DropdownMenuContent>
      </DropdownMenu>
      <Button onSubmit={handleSubmit}>Submit</Button>
    </form>
  );
}