export const renderContentWithAnnotations = (content, annotations) => {
  let annotatedContent = [];
  let currentIndex = 0;

  annotations
    .sort((a, b) => a.start - b.start) // Ensure ascending order
    .forEach(({ start, end, value, username, creationDate }, idx) => {
      console.log(`Processing annotation ${idx}:`, { start, end, value });

      // Add text before annotation
      if (currentIndex < start) {
        annotatedContent.push(
          <span key={`plain-${idx}`}>{content.slice(currentIndex, start)}</span>
        );
      }

      // Add the annotated text itself
      if (start < end && end <= content.length) {
        annotatedContent.push(
          <span
            key={`annotation-${idx}`}
            className="annotated-text"
            title={`${value}\nBy: ${username}\nOn: ${creationDate}`}
          >
            {content.slice(start, end)}
          </span>
        );
      }

      currentIndex = Math.max(currentIndex, end);
    });

  // Add the remaining content after last annotation
  if (currentIndex < content.length) {
    annotatedContent.push(
      <span key="remainder">{content.slice(currentIndex)}</span>
    );
  }

  return annotatedContent;
};
