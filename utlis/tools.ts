export const skipHtmlTags = (text: string) => {
    return text.replace(/<[^>]*>?/g, '').replace(/&nbsp;/g, ' ');
}