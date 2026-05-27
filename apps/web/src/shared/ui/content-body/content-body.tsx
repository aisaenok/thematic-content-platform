type ContentBodyProps = {
  paragraphs: string[]
}

export const ContentBody = ({ paragraphs }: ContentBodyProps) => {
  if (paragraphs.length === 0) {
    return null
  }

  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  )
}
