.PHONY: flash

dev-android:
	ionic build && \
	ionic cap copy && \
	ionic capacitor sync android && \
	ionic cap open android

dev-ios:
	ionic build && \
	ionic cap copy && \
	ionic capacitor sync ios && \
	ionic cap open ios

dev-web:
	ionic serve