using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using VRTK;
using UnityEngine.SceneManagement;
using Valve.VR;

public class PointerDontDestroyOnLoad : MonoBehaviour
{
    private int dont_destroy_counter;

    // Start is called before the first frame update
    void Start()
    {
        SteamVR_Events.System(EVREventType.VREvent_TrackedDeviceUserInteractionStarted).Listen(TrackedDeviceUserInteractionStartedListener);

        dont_destroy_counter = 10;
    }

    protected void TrackedDeviceUserInteractionStartedListener<T>(T ignoredArgument)
    {
        dont_destroy_counter = 10;
    }


    // Update is called once per frame
    void Update()
    {
        if (!(dont_destroy_counter == 0))
            DontDestroy();
    }

    private void DontDestroy()
    {
        VRTK_StraightPointerRenderer pointer = gameObject.GetComponent<VRTK_StraightPointerRenderer>();
        if (pointer != null)
        {
            GameObject[] objects = pointer.GetPointerObjects();
            if (objects[0] != null && objects[1] != null && objects[2] != null)
            {
                DontDestroyOnLoad(objects[0].transform.root.gameObject);
                DontDestroyOnLoad(objects[1].transform.root.gameObject);
                DontDestroyOnLoad(objects[2].transform.root.gameObject);

                dont_destroy_counter--;
                Debug.Log("dont destroy index: " + dont_destroy_counter);
            }
        }
    }

    public void PointerScale(float scale)
    {
        gameObject.GetComponent<VRTK_StraightPointerRenderer>().cursorScaleMultiplier = scale;
    }
}
