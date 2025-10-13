import IconOnlyAlert from "../../alert/iconOnlyAlert";

const BodyContent = ({ itemsLength, isLoading, children }) => (
    <>
        {itemsLength === 0 && isLoading ? (
            <div className="h-screen w-screen flex items-center justify-center">
                    <IconOnlyAlert />
            </div>
        ) : (
            <>
                {children}
            </>
        )}
    </>
);

export default BodyContent;

