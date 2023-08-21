'use client';

import { useState } from 'react';
import { getSummary } from './api/helpers/openai';
import { getHTML } from './api/helpers/openai';
import { getTranslation } from './api/helpers/translate';
import { useReactPDF } from './_hooks/useReactPDF';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FormInterface {
  text: string;
  translate: boolean;
  language: string;
}

export default function SummaryForm() {
  const [form, setForm] = useState<FormInterface>({
    text: '',
    translate: false,
    language: '',
  });
  const [summary, setSummary] = useState<string>('');
  const [html, setHTML] = useState<string>('');

  const { MyPDFViewer, MyPDFDownloadLink } = useReactPDF(html);

  const handleChange = (evt: any) => {
    const input = evt.target;
    if (input.name === 'text') {
      setForm((formData) => ({
        ...formData,
        [input.name]: input.value,
      }));
    } else {
      setForm((formData) => ({
        ...formData,
        [input.name]: !form.translate,
      }));
    }
  };

  const updateLanguage = (value: string) => {
    setForm((formData) => ({
      ...formData,
      ['language']: value,
    }));
  };

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    try {
      let summary = await getSummary(form.text);
      if (form.translate && form.language) {
        summary = await getTranslation(summary, form.language);
      }
      setSummary(summary);
      const htmlSummary = await getHTML(summary);
      setHTML(htmlSummary);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 p-4 mx-4 my-8 rounded-lg" >
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="bg-black border border-black rounded-lg p-6 text-white text-center m-4">
          <h1 className="text-3xl font-semibold mb-2">Welcome to Family Transcribe</h1>
          <p className="mt-2">Facilitating meaningful conversations between generations</p>
        </div>
        <Textarea name='text' onChange={handleChange} className="h-40 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 mb-4" 
                  placeholder="Paste your text here..." />
        <div className="flex flex-col items-center"> {/* Wrap the components */}
          <div className="mb-4">
            <Checkbox id='translate' name='translate' onChange={handleChange} />
            <Label htmlFor='translate' className=" ml-2">Translate?</Label>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger disabled={!form.translate}>
              <Button variant='outline'>Choose Language</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={form.language}
                onValueChange={updateLanguage}
              >
                <DropdownMenuRadioItem value='arabic'>Arabic</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='chinese-simplified'>
                  Chinese-Simplified
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='chinese-traditional'>
                  Chinese-Traditional
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='dutch'>Dutch</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='french'>French</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='german'>German</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='italian'>
                  Italian
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='japanese'>
                  Japenese
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='ko'>Korean</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='portuguese'>
                  Portuguese
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='russian'>
                  Russian
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='es'>Spanish</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='turkish'>
                  Turkish
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center mt-4"> {/* Flex container */}
          <Button type='submit' onSubmit={handleSubmit} className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer">
            Submit
          </Button>
        </div>
        <div className="mx-auto mt-4">
          {summary && <p>{summary}</p>}
        </div>
        {html ? (
          <div className="text-center">
            <br></br>
            <p>PDF: (still in development for non-Latin languages)</p>
            <div className="mx-auto mt-4 relative" style={{ width: '50%' }}> {/* Center and position */}
              <MyPDFViewer />
            </div>
            <br></br>
            <div className="flex justify-center mt-4">
              <div className="inline-block rounded-md shadow">
                <MyPDFDownloadLink className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 cursor-pointer rounded-md shadow-md"/>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
