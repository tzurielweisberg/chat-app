it('should update iframe src', () => {
        component.onboardingStatus$ = of(OnboardingStatus.NotStarted);
        component.isLoading = false;
        fixture.detectChanges();
        const videoIframe = () => fixture.debugElement.query(css('.test-video-iframe')).nativeElement;
        expect(videoIframe().src).toBe(trialPageInformation.videoLink);
    });
