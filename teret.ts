it('should update iframe src', () => {
        component.onboardingStatus$ = of(OnboardingStatus.NotStarted);
        component.isLoading = false;
        fixture.detectChanges();
        const videoIframe = () => fixture.debugElement.queryq(By.css);
        expect(videoIframe().src).toBe(trialPageInformation.videoLink);
    });
