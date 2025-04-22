

const OnboardHomePage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <p className='text-3xl text-black'>It's easy to get cooking on Mealsly</p>

            <p className='text-lg'>Go through a few steps to:</p>
            <ul className='flex flex-col pl-4 gap-2'>
                <li className='list-disc'>Tell us a bit about yourself</li>
                <li className='list-disc'>Provide tags about what sort of menu you are offering</li>
                <li className='list-disc'>Add in your location</li>
                <li className='list-disc'>Upload complimenting images of your brand</li>
                <li className='list-disc'>Upload any documents you want people to know about</li>
                <li className='list-disc'>Add in how you would like to be paid</li>
            </ul>

            <p className='text-sky-700 text-lg'>Then, you can start setting up your menu, ready to get orders!</p>
        </div>
    )
}

export default OnboardHomePage;