<script lang="ts" setup>
import { useI18n } from '@n8n/i18n';

const emit = defineEmits<{ optimize: [] }>();
const i18n = useI18n();
</script>
<template>
	<N8nButton
		icon="zap"
		size="large"
		type="secondary"
		:title="i18n.baseText('nodeView.optimizeWorkflow')"
		data-test-id="optimize-workflow-button"
		@click="emit('optimize')"
	>
		{{ i18n.baseText('nodeView.optimizeWorkflow') }}
	</N8nButton>
</template>
