'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { EditorState } from 'lexical'

interface EditorProps {
    onChange: (value: string) => void
}

const theme = {
    paragraph: 'mb-2',
    text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
    },
}

function onError(error: Error) {
    console.error(error)
}

export function Editor({ onChange }: EditorProps) {
    function handleChange(editorState: EditorState) {
        editorState.read(() => {
            const json = editorState.toJSON()
            onChange(JSON.stringify(json))
        })
    }

    return (
        <LexicalComposer initialConfig={{ namespace: 'blog-editor', theme, onError }}>
            <div className="border rounded-md min-h-40 relative">
                <RichTextPlugin
                    contentEditable={
                    <ContentEditable className="px-3 py-2 min-h-40 outline-none text-sm" />
                    }
                    placeholder={
                    <div className="absolute top-2 left-3 text-gray-400 text-sm pointer-events-none">
                        Escreva o conteúdo do post...
                    </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={handleChange} />
            </div>
        </LexicalComposer>
    )
}