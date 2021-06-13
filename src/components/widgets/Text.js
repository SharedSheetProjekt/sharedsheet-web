import { useState } from "react";
import WidgetScaffold from "./WidgetScaffold"
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';
import '../../CSS/highlight.js.css';

var md = new Remarkable({
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks

    // Enable some language-neutral replacement + quotes beautification
    typographer:  true,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '„“‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }
    
        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}
    
        return ''; // use external default escaping
      }
});

const Text = ({ widgetID, content }) => {

  /*useEffect(() => {
    loadMarkdown();
  }, [content])*/

  const loadMarkdown = () => {
    if (content) {
      return { __html: md.render(content) }; 
    } else {
      return null;
    }
  }

  return (
      <WidgetScaffold widgetID={ widgetID }>
          <div className="markdown-text" dangerouslySetInnerHTML={ loadMarkdown() }></div>
          {/*<p style={{ whiteSpace: 'pre-wrap' }}>{ content }</p>*/}
      </WidgetScaffold>
  )
}

export default Text
