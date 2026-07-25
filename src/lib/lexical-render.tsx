import { ReactNode } from 'react'

interface LexicalNode {
  type: string
  text?: string
  format?: number
  children?: LexicalNode[]
  tag?: string
  listType?: string
  value?: number
}

// Formatos de texto do Lexical (bitmask)
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16

function renderText(node: LexicalNode, key: number): ReactNode {
  let content: ReactNode = node.text ?? ''
  const fmt = node.format ?? 0

  if (fmt & FORMAT_CODE) content = <code key={key} style={{ background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.9em' }}>{content}</code>
  if (fmt & FORMAT_BOLD) content = <strong key={key}>{content}</strong>
  if (fmt & FORMAT_ITALIC) content = <em key={key}>{content}</em>
  if (fmt & FORMAT_UNDERLINE) content = <u key={key}>{content}</u>

  return <span key={key}>{content}</span>
}

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)

    case 'paragraph': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? []
      const isEmpty = node.children?.every(c => !c.text?.trim())
      if (isEmpty) return <br key={key} />
      return (
        <p key={key} style={{ marginBottom: '1.25rem', lineHeight: 1.85, color: '#333' }}>
          {children}
        </p>
      )
    }

    case 'heading': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? []
      const tag = node.tag ?? 'h2'
      const sizes: Record<string, string> = { h1: '2rem', h2: '1.6rem', h3: '1.3rem', h4: '1.1rem' }
      return (
        <div key={key} style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: sizes[tag] ?? '1.3rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#111',
        }}>
          {children}
        </div>
      )
    }

    case 'quote': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? []
      return (
        <blockquote key={key} style={{
          borderLeft: '3px solid #9b8cff',
          paddingLeft: '1.25rem',
          margin: '2rem 0',
          color: '#666',
          fontStyle: 'italic',
          lineHeight: 1.8,
        }}>
          {children}
        </blockquote>
      )
    }

    case 'list': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? []
      return node.listType === 'bullet'
        ? <ul key={key} style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', listStyleType: 'disc' }}>{children}</ul>
        : <ol key={key} style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>{children}</ol>
    }

    case 'listitem': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? []
      return <li key={key} style={{ marginBottom: '0.4rem', lineHeight: 1.75, color: '#333' }}>{children}</li>
    }

    case 'linebreak':
      return <br key={key} />

    default:
      return null
  }
}

export function renderLexical(content: string): ReactNode {
  try {
    const parsed = JSON.parse(content)
    return parsed.root.children.map((node: LexicalNode, i: number) => renderNode(node, i))
  } catch {
    return <p style={{ color: '#333', lineHeight: 1.85 }}>{content}</p>
  }
}
