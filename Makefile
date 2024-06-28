.PHONY: flash

dev-android:
	npx ionic build && \
	npx ionic cap copy && \
	npx ionic capacitor sync android && \
	npx ionic cap open android

dev-ios:
	npx ionic build && \
	npx ionic cap copy && \
	npx ionic capacitor sync ios
	npx ionic cap open ios -l --external

dev-web:
	npx ionic serve
