import { React, useState } from 'react';

import FloatingChatIcon from './Chat/FloatingChatIcon';
import FloatingChatModal from './Chat/FloatingChatModal';

function FloatingChat() {
  /* 控制floatingChatModal */
  const [isExpand, setIsExpand] = useState(false);

  return (
    <>
      <FloatingChatIcon isExpand={isExpand} setIsExpand={setIsExpand} />
      {isExpand && (
        <FloatingChatModal isExpand={isExpand} setIsExpand={setIsExpand} />
      )}
    </>
  );
}

export default FloatingChat;
