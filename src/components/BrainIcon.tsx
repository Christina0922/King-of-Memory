import React from 'react';
import './BrainIcon.css';

export const BrainIcon: React.FC = () => {
  return (
    <div className="brain-icon-container">
      <svg
        viewBox="0 0 200 200"
        className="brain-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8d8ea" />
            <stop offset="50%" stopColor="#b8a9d4" />
            <stop offset="100%" stopColor="#d4a5d4" />
          </linearGradient>
        </defs>
        
        {/* 왼쪽 뇌 반구 - 더 명확한 형태 */}
        <path
          d="M 40 70
             Q 35 60, 40 50
             Q 45 40, 55 45
             Q 65 50, 70 60
             Q 75 70, 75 80
             Q 75 90, 72 100
             Q 69 110, 68 120
             Q 67 130, 70 140
             Q 73 150, 80 155
             Q 87 160, 95 158
             Q 103 156, 100 150
             Q 97 144, 95 135
             Q 93 126, 92 115
             Q 91 104, 90 95
             Q 89 86, 88 78
             Q 87 70, 85 65
             Q 83 60, 80 58
             Q 77 56, 73 58
             Q 69 60, 65 62
             Q 61 64, 57 66
             Q 53 68, 50 70
             Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 오른쪽 뇌 반구 - 더 명확한 형태 */}
        <path
          d="M 160 70
             Q 165 60, 160 50
             Q 155 40, 145 45
             Q 135 50, 130 60
             Q 125 70, 125 80
             Q 125 90, 128 100
             Q 131 110, 132 120
             Q 133 130, 130 140
             Q 127 150, 120 155
             Q 113 160, 105 158
             Q 97 156, 100 150
             Q 103 144, 105 135
             Q 107 126, 108 115
             Q 109 104, 110 95
             Q 111 86, 112 78
             Q 113 70, 115 65
             Q 117 60, 120 58
             Q 123 56, 127 58
             Q 131 60, 135 62
             Q 139 64, 143 66
             Q 147 68, 150 70
             Z"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 중앙 고랑 - 더 명확하게 */}
        <path
          d="M 100 45
             Q 100 50, 100 60
             Q 100 70, 100 80
             Q 100 90, 100 100
             Q 100 110, 100 120
             Q 100 130, 100 140
             Q 100 150, 100 155"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* 왼쪽 반구 주름들 - 더 명확하게 */}
        <path
          d="M 60 65 Q 65 70, 70 65"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 58 80 Q 68 85, 78 80"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 60 95 Q 70 100, 80 95"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 58 110 Q 68 115, 78 110"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 60 125 Q 70 130, 80 125"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 62 72 Q 67 77, 72 72"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 62 102 Q 72 107, 82 102"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* 오른쪽 반구 주름들 - 더 명확하게 */}
        <path
          d="M 140 65 Q 135 70, 130 65"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 142 80 Q 132 85, 122 80"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 140 95 Q 130 100, 120 95"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 142 110 Q 132 115, 122 110"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 140 125 Q 130 130, 120 125"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 138 72 Q 133 77, 128 72"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 138 102 Q 128 107, 118 102"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
