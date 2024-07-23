'use client';
import React, { useState, useEffect } from 'react';

const Keyboard = () => {
  const [highlightedKeys, setHighlightedKeys] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      { key: 'cmd1', duration: 500 },
      { key: 'C', duration: 500 },
      { key: 'cmd1', duration: 500, reset: true },
      { key: 'cmd1', duration: 500 },
      { key: 'V', duration: 500 },
      { key: 'cmd1', duration: 500, reset: true },
    ];

    let currentIndex = 0;

    const highlightNextKey = () => {
      if (currentIndex < sequence.length) {
        const { key, duration, reset } = sequence[currentIndex];
        setHighlightedKeys(reset ? [] : (prevKeys) => [...prevKeys, key]);
        currentIndex++;
        setTimeout(highlightNextKey, duration);
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setHighlightedKeys([]);
          highlightNextKey();
        }, 1000); // Restart after 1 second
      }
    };

    highlightNextKey();
  }, []);

  const keyStyle = (key: string) => {
    return highlightedKeys.includes(key)
      ? {
          transform: 'translateY(-5px)',
          boxShadow: '0 0 10px blue',
        }
      : {};
  };

  return (
    <div className='flex justify-center items-center mt-[200px]'>
      {/* keyboard */}
      <div className='absolute md:relative rounded-md bg-zinc-800 p-1 scale-[1.7] translate-x-10 w-fit h-fit mx-auto'>
        {/* Row 1 */}
        <div className='flex gap-[2px] mb-[2px] w-full flex-shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>esc</div>
            </div>
          </div>
          {[...Array(12)].map((_, index) => (
            <div key={index} className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
              <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
                <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>{`F${index + 1}`}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className='flex gap-[2px] mb-[2px] w-full flex-shrink-0'>
          {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((key) => (
            <div key={key} className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
              <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
                <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>{key}</div>
              </div>
            </div>
          ))}
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[60px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>delete</div>
            </div>
          </div>
        </div>
        {/* Row 3 */}
        <div className='flex gap-[2px] mb-[2px] w-full flex-shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[40px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>tab</div>
            </div>
          </div>
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((key) => (
            <div key={key} className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
              <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
                <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>{key}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Row 4 */}
        <div className='flex gap-[2px] mb-[2px] w-full flex-shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>caps lock</div>
            </div>
          </div>
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''].map((key) => (
            <div key={key} className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
              <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
                <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>{key}</div>
              </div>
            </div>
          ))}
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>return</div>
            </div>
          </div>
        </div>
        {/* Row 5 */}
        <div className='flex gap-[2px] mb-[2px] w-full flex-shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[60px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>shift</div>
            </div>
          </div>
          {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((key) => (
            <div key={key} className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100' style={keyStyle(key)}>
              <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'>
                <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>{key}</div>
              </div>
            </div>
          ))}
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[80px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>shift</div>
            </div>
          </div>
        </div>
        {/* Row 6 */}
        <div className='flex gap-[2px] w-full flex-shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('ctrl')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>ctrl</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('opt')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>opt</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('cmd1')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>cmd</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[180px]'>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>space</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('cmd2')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>cmd</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('opt')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>opt</div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 w-[50px]' style={keyStyle('ctrl')}>
            <div className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-end justify-start pl-[4px] pb-[2px]'>
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>ctrl</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;


