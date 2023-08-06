it('should update iframe src', () => {
        component.onboardingStatus$ = of(OnboardingStatus.NotStarted);
        component.isLoading = false;
        fixture.detectChanges();
        const videoIframe = () => fixture.debugElement.query(Css);
        expect(videoIframe().src).toBe(trialPageInformation.videoLink);
    });
