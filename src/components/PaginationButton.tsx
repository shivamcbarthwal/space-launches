import { Button } from "@mui/material";

type PaginationButtonProps = {
    hasPrevious: boolean;
    hasNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
};

const PaginationButtons = ({
    hasPrevious,
    hasNext,
    onPrevious,
    onNext,
}: PaginationButtonProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
                <Button variant="outlined" disabled={!hasPrevious} onClick={onPrevious}>
                    Previous
                </Button>
            </div>
            <div style={{ flex: 1 }}>
                <Button variant="outlined" disabled={!hasNext} onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PaginationButtons;