import React, { useState } from 'react';

export default function LoadingButton(props) {
  const [loading, setLoading] = useState(false);

  async function submit()
  {
    if (!loading) {
      setLoading(true);
      await props.onClick();
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={submit}>{props.text}</button>
    </div>
  );
}