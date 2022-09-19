import React from 'react'

interface IOnBoardingFlow {
	children: React.ReactNode[],
	currentIndex: number,
	// onFinish: () => void,
	// onNext: (nextIndex: number) => void,
	// onPrevious: (prevIndex: number) => void
}

function OnBoardingFlow({ children, currentIndex }: IOnBoardingFlow) {

    // const goToNext = (stepData:number) => {
	// 	onNext(stepData);
	// }

	const currentChild = React.Children.toArray(children)[currentIndex];

	if (React.isValidElement(currentChild)) {
		return currentChild //{ goToNext, onFinish, onPrevious }
	}
	return <></>
}


export default OnBoardingFlow
