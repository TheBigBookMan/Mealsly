import NavToTile from "../../common/ui/NavToTile";

const SettingsPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <NavToTile navTo="payments" title="Payments & payouts" subtitle='Credit cards' />

            <NavToTile navTo="security" title="Login & security" subtitle='Password and login history' />

            <NavToTile navTo="notifications" title="Notifications" subtitle='How we contact you' />

            <NavToTile navTo="location" title="Location settings" subtitle='Update location manually' />
        </div>
    )
}

export default SettingsPage;