it('should update iframe src', () => {
        component.onboardingStatus$ = of(OnboardingStatus.NotStarted);
        component.isLoading = false;
        fixture.detectChanges();
        const videoIframe = () => fixture.debugElement.query(tzur.css('.test-video-iframe')).nativeElement;
        
        expect(videoIframe().src).toBe(trialPageInformation.videoLink);
    });
