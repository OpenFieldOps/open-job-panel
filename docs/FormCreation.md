# Form Creation Guide

This guide documents the standardized pattern for creating forms in the OpenField application.

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Form Architecture](#form-architecture)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Common Patterns](#common-patterns)
6. [Form Input Components](#form-input-components)
7. [Examples](#examples)

---

## Overview

All forms in the application follow a consistent architecture:

- Use `FormTemplate` component as the wrapper
- Use `useMutationForm` hook for form state management and API mutations
- Use standardized input components with labels (`InputWithLabel`, `TextAreaWithLabel`, etc.)
- Follow React Hook Form patterns for validation and state management

---

## Core Components

### 1. FormTemplate

**Location**: [src/components/block/FormTemplate.tsx](../src/components/block/FormTemplate.tsx)

The base template for all forms. Handles:

- Form submission
- Loading states
- Submit button rendering
- Delete functionality (optional)
- Scrollable content (optional)

**Props**:

```typescript
{
  title?: string;              // Form title
  confirmText?: string;        // Submit button text (default: "Create")
  onSubmit?: FormEventHandler; // Form submit handler
  onDelete?: () => void;       // Optional delete handler
  disableSubmit?: boolean;     // Disable submit button
  trigger?: React.ReactNode;   // Custom submit button/trigger
  scrollable?: boolean;        // Enable scrollable content
  isLoading?: boolean;         // Show loading state
  noData?: string;            // Message when no data
  children: React.ReactNode;  // Form fields
}
```

### 2. useMutationForm Hook

**Location**: [src/hooks/useMutationForm.ts](../src/hooks/useMutationForm.ts)

Custom hook that combines React Hook Form with TanStack Query mutations.

**Features**:

- Form state management (React Hook Form)
- API mutation handling (TanStack Query)
- Automatic error handling and toasts
- Form validation
- Cache updates

**Props**:

```typescript
{
  mutationFn: (input: Inputs) => Promise<ApiResponse<Data>>;
  onApiSuccess?: (data: Data) => void;
  defaultValues?: DefaultValues<Inputs>;
  onError?: {
    400?: () => void;
    401?: () => void;
    404?: () => void;
    409?: () => void;
  };
}
```

**Returns**:

```typescript
{
  isPending: boolean;
  handleSubmit: (onSubmit) => void;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  formState: FormState<Inputs>;
  reset: UseFormReset<Inputs>;
  errorHandledRegister: (name: keyof Inputs, options?: { isNumber?: boolean }) => RegisterReturn & { error: string; required: boolean };
  control: Control<Inputs>;
}
```

---

## Form Architecture

### Standard Form Structure

```
MyForm Component
├── Custom Hook (useMyFormLogic)
│   ├── useMutationForm
│   ├── Additional state/logic
│   └── Returns form handlers
└── FormTemplate
    ├── Input Components
    │   ├── InputWithLabel
    │   ├── TextAreaWithLabel
    │   ├── SelectWithLabel
    │   ├── SliderWithLabel
    │   └── Custom Components
    └── Submit/Delete Actions
```

---

## Step-by-Step Guide

### 1. Define Types

```typescript
// Define form input types
type Inputs = {
  title: string;
  description: string;
  email: string;
  // ... other fields
};

// Define component props
type MyFormProps = {
  onCreated: () => void;
  // ... other props
};
```

### 2. Create Custom Hook

Create a custom hook to encapsulate form logic:

```typescript
function useMyForm({ onCreated }: MyFormProps) {
  const {
    handleSubmit,
    errorHandledRegister,
    formState: { errors },
    isPending,
    control,
  } = useMutationForm({
    mutationFn: async (data: Inputs) => {
      return apiClient.myResource.post(data);
    },
    onApiSuccess(data) {
      // Update cache
      apiQueryCacheListAdd([QueryCacheKey.MyResourceList], data);

      // Show success message
      toaster.success({
        title: "Resource created successfully",
      });

      // Execute callback
      onCreated();
    },
    defaultValues: {
      // Set default values if needed
    },
  });

  return {
    register: errorHandledRegister,
    errors,
    handleSubmit,
    isPending,
    control,
  };
}
```

### 3. Build Form Component

```typescript
export default function MyForm({ onCreated }: MyFormProps) {
  const { register, errors, handleSubmit, isPending, control } = useMyForm({
    onCreated,
  });

  return (
    <FormTemplate
      onSubmit={handleSubmit}
      title="Create Resource"
      isLoading={isPending}
    >
      <InputWithLabel
        label="Title"
        placeholder="Enter title"
        {...register("title")}
        error={errors.title?.type}
      />

      <TextAreaWithLabel
        label="Description"
        placeholder="Enter description"
        {...register("description")}
        error={errors.description?.type}
      />

      {/* Add more fields as needed */}
    </FormTemplate>
  );
}
```

---

## Common Patterns

### Pattern 1: Simple Create Form

**Use Case**: Creating a new resource with basic fields

**Example**: [UserCreateForm.tsx](../src/features/operator/components/UserCreateForm.tsx)

```typescript
export default function UserCreateForm({ onCreated, role }: UserCreateProps) {
  const { errorHandledRegister, handleSubmit, isPending } = useMutationForm({
    mutationFn: apiClient.user["create-user"].post,
    onApiSuccess(data) {
      apiQueryCacheListAdd(roleCacheKeyMap[role], data);
      toaster.success({ title: "User created successfully" });
      onCreated();
    },
    defaultValues: { role },
  });

  return (
    <FormTemplate
      isLoading={isPending}
      onSubmit={handleSubmit}
      title={`Create ${role}`}
    >
      <InputWithLabel
        label="First Name"
        {...errorHandledRegister("firstName")}
      />
      <InputWithLabel label="Last Name" {...errorHandledRegister("lastName")} />
      <InputWithLabel
        label="Email"
        type="email"
        {...errorHandledRegister("email")}
      />
    </FormTemplate>
  );
}
```

### Pattern 2: Form with Custom Inputs

**Use Case**: Forms with checkboxes, selects, or other custom inputs

**Example**: [JobCreateForm.tsx](../src/features/jobs/components/JobCreateForm.tsx)

```typescript
<FormTemplate
  onSubmit={handleSubmit}
  title="Create an Job"
  isLoading={isPending}
>
  <InputWithLabel
    label="Title"
    {...register("title")}
    error={errors.title?.type}
  />

  <HStack justifyContent={"flex-start"} w={"full"}>
    <Controller
      name="broadcast"
      control={control}
      render={({ field }) => (
        <Checkbox.Root onCheckedChange={field.onChange} checked={field.value}>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Broadcast ?</Checkbox.Label>
        </Checkbox.Root>
      )}
    />
  </HStack>
</FormTemplate>
```

### Pattern 3: Form with Dynamic Fields (Field Arrays)

**Use Case**: Forms with repeating/dynamic fields

**Example**: [PricingModelForm.tsx](../src/features/pricing-model/components/PricingModelForm.tsx)

```typescript
export default function PricingModelForm({
  mutationFn,
  onSuccess,
  defaultValues,
}: Props) {
  const { handleSubmit, errorHandledRegister, isPending, control } =
    useMutationForm({
      mutationFn,
      onApiSuccess(data) {
        apiQueryCacheListUpdate([QueryCacheKey.PricingModelList], (oldData) => {
          const exists = oldData.find((item) => item.id === data.id);
          if (exists) {
            return oldData.map((item) => (item.id === data.id ? data : item));
          }
          return [...oldData, data];
        });
        onSuccess(data);
      },
      defaultValues: defaultValues || { name: "", baseRate: 50, ranges: [] },
    });

  const pricingRangeList = useFieldArray({ control, name: "ranges" });

  return (
    <FormTemplate
      isLoading={isPending}
      onSubmit={handleSubmit}
      title="Create Pricing Model"
      trigger={
        <>
          <OutlineButton
            onClick={() => pricingRangeList.append({ hours: 1, rate: 50 })}
          >
            <Plus /> Add Range
          </OutlineButton>
          <Button type="submit">Save</Button>
        </>
      }
    >
      <InputWithLabel label="Name" {...errorHandledRegister("name")} />
      <SliderWithLabel
        label="Base Rate"
        {...errorHandledRegister("baseRate", { isNumber: true })}
        min={0}
        max={500}
      />

      {/* Render dynamic fields */}
      <VStack>
        {pricingRangeList.fields.map((field, i) => (
          <RangeField
            key={field.id}
            onDelete={() => pricingRangeList.remove(i)}
            {...field}
          />
        ))}
      </VStack>
    </FormTemplate>
  );
}
```

### Pattern 4: Reusable Form for Create/Edit

**Use Case**: Same form used for both creating and editing

```typescript
type MyFormProps = {
  mutationFn: (data: Inputs) => Promise<ApiResponse<Data>>;
  onSuccess: (data: Data) => void;
  defaultValues?: Partial<Inputs>;
  isEdit?: boolean;
};

export default function MyForm({
  mutationFn,
  onSuccess,
  defaultValues,
  isEdit,
}: MyFormProps) {
  const { handleSubmit, errorHandledRegister, isPending } = useMutationForm({
    mutationFn,
    onApiSuccess: onSuccess,
    defaultValues,
  });

  return (
    <FormTemplate
      isLoading={isPending}
      onSubmit={handleSubmit}
      title={isEdit ? "Edit Resource" : "Create Resource"}
      confirmText={isEdit ? "Update" : "Create"}
    >
      {/* Form fields */}
    </FormTemplate>
  );
}
```

---

## Form Input Components

All input components are located in [src/components/form/](../src/components/form/)

### Available Components

#### 1. InputWithLabel

**Location**: [InputWithLabel.tsx](../src/components/form/InputWithLabel.tsx)

Standard text input with label and error handling.

```typescript
<InputWithLabel
  label="Title"
  placeholder="Enter title"
  type="text" // or "email", "password", "tel", etc.
  autoComplete="off"
  {...register("title")}
  error={errors.title?.type}
/>
```

#### 2. TextAreaWithLabel

**Location**: [TextAreaWithLabel.tsx](../src/components/form/TextAreaWithLabel.tsx)

Multi-line text input with label.

```typescript
<TextAreaWithLabel
  label="Description"
  placeholder="Enter description"
  {...register("description")}
  error={errors.description?.type}
/>
```

#### 3. SelectWithLabel

**Location**: [SelectWithLabel.tsx](../src/components/form/SelectWithLabel.tsx)

Searchable select/combobox with label.

```typescript
<SelectWithLabel
  label="Category"
  items={categories}
  onSelect={(id) => setValue("categoryId", id)}
  defaultValue={defaultCategoryId}
  clearable={true}
/>
```

#### 4. SliderWithLabel

**Location**: [SliderWithLabel.tsx](../src/components/form/SliderWithLabel.tsx)

Slider input for numeric values.

```typescript
<SliderWithLabel
  label="Price"
  {...errorHandledRegister("price", { isNumber: true })}
  min={0}
  max={100}
  step={5}
  defaultValue={[50]}
/>
```

#### 5. SwitchWithLabel

**Location**: [SwitchWithLabel.tsx](../src/components/form/SwitchWithLabel.tsx)

Toggle switch with label.

```typescript
<SwitchWithLabel label="Active" {...register("isActive")} />
```

#### 6. FieldWithLabel / FieldWithError

**Location**: [FieldWithLabel.tsx](../src/components/form/FieldWithLabel.tsx)

Generic wrapper for custom inputs.

```typescript
<FieldWithLabel label="Custom Field" error={errors.custom?.type}>
  <CustomInput {...register("custom")} />
</FieldWithLabel>
```

---

## Cache Management

### Adding to Cache

```typescript
import { apiQueryCacheListAdd } from "@/lib/apiClient";

onApiSuccess(data) {
  apiQueryCacheListAdd([QueryCacheKey.MyResourceList], data);
}
```

### Updating Cache

```typescript
import { apiQueryCacheListUpdate } from "@/lib/apiClient";

onApiSuccess(data) {
  apiQueryCacheListUpdate([QueryCacheKey.MyResourceList], (oldData) => {
    return oldData.map((item) => (item.id === data.id ? data : item));
  });
}
```

---

## Validation

The application uses `formValidation` rules defined in [src/utils/form-validation.ts](../src/utils/form-validation.ts).

The `errorHandledRegister` function automatically applies validation rules based on field names.

### Using errorHandledRegister

```typescript
// Automatically applies validation rules for "email" field
<InputWithLabel
  label="Email"
  type="email"
  {...errorHandledRegister("email")}
/>

// For number fields
<InputWithLabel
  label="Price"
  type="number"
  {...errorHandledRegister("price", { isNumber: true })}
/>
```

---

## Error Handling

### Display Field Errors

```typescript
<InputWithLabel
  label="Email"
  {...register("email")}
  error={errors.email?.type} // Displays validation error
/>
```

### Custom Error Handlers

```typescript
useMutationForm({
  mutationFn,
  onApiSuccess(data) {
    /* ... */
  },
  onError: {
    404: () => {
      toaster.error({ title: "Resource not found" });
    },
    409: () => {
      toaster.error({ title: "Conflict: Resource already exists" });
    },
  },
});
```

---

## Best Practices

1. **Separation of Concerns**: Extract form logic into custom hooks
2. **Type Safety**: Always define TypeScript types for form inputs
3. **Error Handling**: Use `errorHandledRegister` and display errors appropriately
4. **Cache Management**: Update React Query cache after successful mutations
5. **User Feedback**: Show toast notifications for success/error states
6. **Validation**: Leverage the form validation system for consistent validation
7. **Reusability**: Create reusable forms that handle both create and edit operations
8. **Loading States**: Always pass `isLoading={isPending}` to FormTemplate
9. **Callbacks**: Execute callbacks (`onCreated`, `onSuccess`) after successful operations
10. **Default Values**: Provide sensible default values when needed

---

## Troubleshooting

### Form not submitting

- Ensure `onSubmit={handleSubmit}` is passed to FormTemplate
- Check that all required fields have values
- Verify validation rules are not blocking submission

### Errors not displaying

- Make sure `error={errors.fieldName?.type}` is passed to input components
- Verify the field name matches the registration name

### Cache not updating

- Check that the correct cache key is being used
- Ensure `apiQueryCacheListAdd` or `apiQueryCacheListUpdate` is called in `onApiSuccess`

### TypeScript errors

- Ensure input types match the API contract
- Use `errorHandledRegister` with correct field names as keys of `Inputs` type
