
// TODO this is where there will be tiles to descrbe to type of place they are
// TODO all the cuisines, tags like vegetarian
// TODO if they do delivery or pickup etc

import { useOnboard } from "../../../contexts/onboardContext/useOnboard";

const OnboardTagsPage = () => {
    const {onboardDetails} = useOnboard();

    console.log(onboardDetails);
    return (
        <div>
            <p>Onboard tags</p>
        </div>
    )
}

export default OnboardTagsPage;