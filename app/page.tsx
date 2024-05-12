import Image from 'next/image';

export default function Home() {
  return (
    <section className='w-full py-6'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
              Save your time for chores
            </h1>
            <p className='text-gray-500 dark:text-gray-400 md:text-xl'>This is powerful tool for your work.</p>
          </div>
          <Image
            alt='Hero'
            className='mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full'
            height='550'
            src='/input_attendance.webp'
            width='550'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
