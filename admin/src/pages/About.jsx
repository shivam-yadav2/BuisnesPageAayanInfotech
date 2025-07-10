import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const About = () => {
  const [value, setValue] = useState('');
  const editor = useRef(null);
  const [content, setContent] = useState('');

  console.log(content)
  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => { }}
      />
    </div>
  )
}

export default About