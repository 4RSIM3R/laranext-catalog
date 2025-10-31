import { VisitOptions } from '@inertiajs/core';
import { BaseKit } from 'reactjs-tiptap-editor';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { Emoji } from 'reactjs-tiptap-editor/lib/Emoji.js';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { SubAndSuperScript } from 'reactjs-tiptap-editor/subandsuperscript';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { toast } from 'sonner';

const formatErrorMessages = (err: any) => {
    if (err.message) return err.message;
    if (Array.isArray(err))
        return err.map((item) => item.message || item).join(', ');
    if (err.errors) return err.errors;
    return JSON.stringify(err);
};

export const createFormResponse = (successMessage?: string): VisitOptions => ({
    onSuccess: () => {
        toast.success(successMessage || 'Success...');
    },
    onError: (err) => {
        const errorMessage = formatErrorMessages(err);
        toast.error(errorMessage);
    },
});

export const FormResponse: VisitOptions = createFormResponse();

const essentialFormatting = [Heading, Bold, Italic, TextUnderline];
const advancedFormatting = [Strike, Code, Highlight, Color, Clear];
const listsAndStructure = [BulletList, OrderedList, TaskList];
const advancedFeatures = [
    CodeBlock,
    TextAlign,
    Indent,
    LineHeight,
    FontFamily,
    FontSize,
    TextDirection,
    Iframe,
    Emoji,
    Katex,
    SubAndSuperScript,
    MoreMark.configure({
        subscript: false,
        superscript: false,
    }),
    FormatPainter,
    SearchAndReplace,
    SlashCommand,
];

export const extensions: any[] = [
    BaseKit.configure({
        placeholder: {
            placeholder: 'Write your content here...',
            showOnlyCurrent: true,
        },
    }),
    ...essentialFormatting,
    ...advancedFormatting,
    ...listsAndStructure,

    ...advancedFeatures,
];
