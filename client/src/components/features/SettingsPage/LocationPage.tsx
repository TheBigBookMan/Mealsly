import { useUser } from "../../../contexts/userContext/useUser";
import Button from "../../common/ui/Button";

// TODO this will offer the restoreing of location into the database


const LocationPage = () => {
    const {updateEaterLocation, user} = useUser();

    return (
        <div>
            {user && (
                <Button onClick={() => updateEaterLocation(user?.eaterId)}>
                    <p>Update location</p>
                </Button>
            )}
        </div>
    )
}

export default LocationPage;